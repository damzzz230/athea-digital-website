import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = 'https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8'

export default function BackgroundVideo() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlaying = () => setReady(true)
    video.addEventListener('playing', onPlaying)

    // Safari/iOS support HLS natively — skip downloading hls.js entirely.
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC
      return () => video.removeEventListener('playing', onPlaying)
    }

    // Dynamically imported so this ~100KB+ library isn't part of the main
    // bundle parsed on every page load — only fetched by browsers that
    // actually need it, and in parallel rather than blocking app startup.
    // The "light" build drops DRM/subtitle/alt-audio support this muted
    // background loop never uses.
    let hls
    let cancelled = false
    import('hls.js/light').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return
      hls = new Hls()
      hls.loadSource(VIDEO_SRC)
      hls.attachMedia(video)
    })

    return () => {
      cancelled = true
      video.removeEventListener('playing', onPlaying)
      hls?.destroy()
    }
  }, [])

  // The video loops forever via the `loop` attribute — without this it
  // keeps decoding/playing even after the user scrolls well past the hero.
  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px' }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.6)' }} />
    </div>
  )
}

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const VIDEO_SRC = 'https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8'

export default function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC
      return
    }

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(VIDEO_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.6)' }} />
    </div>
  )
}

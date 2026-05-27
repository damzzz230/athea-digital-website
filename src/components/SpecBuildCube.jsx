import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

function makeSphereCloud(count, radius, color, size, opacity) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity })
  return new THREE.Points(geo, mat)
}


export default function SpecBuildCube() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(460, 460)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '50%'
    renderer.domElement.style.left = '50%'
    renderer.domElement.style.transform = 'translate(-50%, -50%)'
    renderer.domElement.style.pointerEvents = 'none'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 5
    camera.updateProjectionMatrix()

    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envTexture = pmrem.fromScene(new RoomEnvironment()).texture
    scene.environment = envTexture
    scene.background = null
    pmrem.dispose()

    const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4)
    const material = new THREE.MeshPhysicalMaterial({
      color: '#1D4ED8',
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 2.5,
      transparent: true,
      opacity: 0.18,
      ior: 1.5,
      reflectivity: 1.0,
      envMapIntensity: 2.0,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const edges = new THREE.EdgesGeometry(geometry)
    const outerLineMat = new THREE.LineBasicMaterial({ color: '#93C5FD', opacity: 0.6, transparent: true, linewidth: 1 })
    const wireframe = new THREE.LineSegments(edges, outerLineMat)
    mesh.add(wireframe)

    const innerEdges = new THREE.EdgesGeometry(geometry)
    const innerLineMat = new THREE.LineBasicMaterial({ color: '#ffffff', opacity: 0.15, transparent: true })
    const innerWireframe = new THREE.LineSegments(innerEdges, innerLineMat)
    innerWireframe.scale.setScalar(0.97)
    mesh.add(innerWireframe)

    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(3, 4, 5)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0x93C5FD, 0.8)
    rimLight.position.set(-3, -2, -3)
    scene.add(rimLight)

    const pointLight = new THREE.PointLight(0x3B82F6, 3.0, 8)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    // Background particle clouds
    const cloudA = makeSphereCloud(200, 3.5, '#3B82F6', 0.06, 0.85)
    scene.add(cloudA)

    const cloudB = makeSphereCloud(100, 2.2, '#93C5FD', 0.035, 0.6)
    scene.add(cloudB)


    let animId
    let isDragging = false
    let prevX = 0, prevY = 0

    const onPointerDown = (e) => {
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
      mount.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      mesh.rotation.y += dx * 0.01
      mesh.rotation.x += dy * 0.01
      prevX = e.clientX
      prevY = e.clientY
    }

    const onPointerUp = () => { isDragging = false }

    mount.addEventListener('pointerdown', onPointerDown)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerup', onPointerUp)

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const t = Date.now()

      if (!isDragging) {
        mesh.rotation.y += 0.004
        mesh.rotation.x += 0.0015
      }

      const pulse = 1 + Math.sin(t * 0.0015) * 0.015
      mesh.scale.set(pulse, pulse, pulse)

      pointLight.position.x = Math.sin(t * 0.001) * 3
      pointLight.position.z = Math.cos(t * 0.001) * 3

      // Background clouds
      cloudA.rotation.y += 0.001
      cloudA.rotation.x += 0.0005
      cloudB.rotation.y -= 0.0015
      cloudB.rotation.x -= 0.0003


      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      mount.removeEventListener('pointerdown', onPointerDown)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerup', onPointerUp)
      cloudA.geometry.dispose(); cloudA.material.dispose()
      cloudB.geometry.dispose(); cloudB.material.dispose()
      envTexture.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'relative', width: '320px', height: '320px', overflow: 'visible' }} />
}

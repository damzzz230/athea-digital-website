// Shared handle to the single Lenis instance created by useLenis(),
// so components outside App.jsx can call lenis.stop()/start().
export const lenisInstance = { current: null }

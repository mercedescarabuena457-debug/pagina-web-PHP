import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [moldes, setMoldes] = useState([])
  const [form, setForm] = useState({ codigo_molde: '', nombre_molde: '', tipo_prenda: 'blusa', estado: 'borrador' })
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [seccionActiva, setSeccionActiva] = useState('moldes')
  const [escalado, setEscalado] = useState({ tallaOrigen: 'M', tallaDestino: 'L', porcentaje: '10' })
  const [resultadoEscalado, setResultadoEscalado] = useState('')
  const [medidasEscaladas, setMedidasEscaladas] = useState([])
  const [moldeEscalado, setMoldeEscalado] = useState(null)
  const [detalleMolde, setDetalleMolde] = useState(null)

  // Autenticación local (token en localStorage)
  const [token, setToken] = useState(() => localStorage.getItem('moldes_token') || '')
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('moldes_user')
      return u ? JSON.parse(u) : null
    } catch {
      return null
    }
  })
  const [credentials, setCredentials] = useState({ nombre_usuario: '', password: '' })

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'moldes', label: 'Moldes' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'medidas', label: 'Medidas' },
    { id: 'ordenes', label: 'Órdenes' }
  ]

  const tendenciasModa = [
    {
      titulo: 'Minimalismo premium',
      descripcion: 'Líneas limpias, tejidos de calidad y siluetas sofisticadas para colecciones elegantes.',
      impacto: 'Alta demanda'
    },
    {
      titulo: 'Color block vibrante',
      descripcion: 'Combinaciones audaces de tonos intensos que destacan en prendas de verano y casual.',
      impacto: 'En crecimiento'
    },
    {
      titulo: 'Sostenibilidad textil',
      descripcion: 'Materiales reciclados, procesos responsables y piezas con enfoque ecológico.',
      impacto: 'Tendencia fuerte'
    },
    {
      titulo: 'Estilo oversized',
      descripcion: 'Prendas holgadas, relajadas y funcionales con un look urbano moderno.',
      impacto: 'Muy popular'
    }
  ]

  const moldesDestacados = [
    {
      codigo: 'CAM-001',
      nombre: 'Molde de camisa',
      tipo: 'Camisa',
      estado: 'Aprobado',
      piezas: ['Delantero', 'Espalda', 'Manga', 'Cuello'],
      medidas: ['Pecho 96 cm', 'Cintura 78 cm', 'Largo 65 cm', 'Manga 60 cm']
    },
    {
      codigo: 'VES-002',
      nombre: 'Molde de vestido',
      tipo: 'Vestido',
      estado: 'En producción',
      piezas: ['Frente', 'Espalda', 'Cintura', 'Falda'],
      medidas: ['Busto 92 cm', 'Cadera 100 cm', 'Largo 110 cm', 'Cintura 72 cm']
    },
    {
      codigo: 'PAN-003',
      nombre: 'Molde de pantalón',
      tipo: 'Pantalón',
      estado: 'Borrador',
      piezas: ['Delantero', 'Espalda', 'Pierna', 'Bolsillo'],
      medidas: ['Cintura 76 cm', 'Cadera 98 cm', 'Largo 105 cm', 'Tiro 26 cm']
    },
    {
      codigo: 'CAMI-004',
      nombre: 'Molde de camiseta',
      tipo: 'Camiseta',
      estado: 'Aprobado',
      piezas: ['Frente', 'Espalda', 'Manga corta', 'Cuello redondo'],
      medidas: ['Ancho de pecho 48 cm', 'Largo 66 cm', 'Manga 18 cm', 'Cuello 36 cm']
    }
  ]

  const vistas = {
    inicio: {
      title: 'Panel de control de producción',
      description: 'Consulta y gestiona la operación central del sistema desde un tablero claro y profesional.'
    },
    moldes: {
      title: 'Gestión de moldes',
      description: 'Registra nuevos moldes y revisa los últimos registros almacenados en la base de datos.'
    },
    clientes: {
      title: 'Administración de clientes',
      description: 'Mantén organizada la información de clientes y sus datos de contacto.'
    },
    medidas: {
      title: 'Control de medidas',
      description: 'Administra juegos de medidas y tallas para cada prenda y cliente.'
    },
    ordenes: {
      title: 'Seguimiento de órdenes',
      description: 'Supervisa órdenes de corte y producción desde un único punto de control.'
    }
  }

  const cargarMoldes = async () => {
    try {
      setCargando(true)
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `Bearer ${token}`
      const respuesta = await fetch('http://localhost:3001/api/moldes', { headers })
      if (!respuesta.ok) {
        if (respuesta.status === 401) throw new Error('No autorizado. Por favor, inicia sesión.')
        throw new Error('No se pudo cargar la lista de moldes')
      }
      const datos = await respuesta.json()
      setMoldes(datos)
      setMensaje('')
    } catch (error) {
      setMensaje(error.message || 'No se pudieron cargar los moldes')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarMoldes()
  }, [token])

  const guardarMolde = async (e) => {
    e.preventDefault()
    try {
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `Bearer ${token}`
      const respuesta = await fetch('http://localhost:3001/api/moldes', {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      })

      if (!respuesta.ok) {
        if (respuesta.status === 401) throw new Error('No autorizado. Por favor, inicia sesión.')
        throw new Error('No se pudo guardar el molde')
      }

      const datos = await respuesta.json()
      if (datos.ok) {
        setMensaje(`Molde guardado correctamente. ID: ${datos.id}`)
        setForm({ codigo_molde: '', nombre_molde: '', tipo_prenda: 'blusa', estado: 'borrador' })
        await cargarMoldes()
      } else {
        setMensaje('No se pudo guardar el molde')
      }
    } catch (error) {
      setMensaje(error.message || 'No se pudo guardar el molde')
    }
  }

  const escalarMolde = (e) => {
    e.preventDefault()
    const porcentaje = Number(escalado.porcentaje)
    const aumento = porcentaje > 0 ? porcentaje : 0
    const base = [96, 78, 65, 60]
    const nuevasMedidas = [
      { nombre: 'Pecho', valor: (base[0] + (base[0] * aumento) / 100).toFixed(1) },
      { nombre: 'Cintura', valor: (base[1] + (base[1] * aumento) / 100).toFixed(1) },
      { nombre: 'Largo', valor: (base[2] + (base[2] * aumento) / 100).toFixed(1) },
      { nombre: 'Manga', valor: (base[3] + (base[3] * aumento) / 100).toFixed(1) }
    ]

    setMedidasEscaladas(nuevasMedidas)
    setMoldeEscalado({
      codigo: `ESC-${Date.now()}`,
      nombre: `Molde escalado ${escalado.tallaOrigen}→${escalado.tallaDestino}`,
      tipo: form.tipo_prenda || 'vestido',
      estado: 'borrador',
      medidas: nuevasMedidas
    })
    setResultadoEscalado(`Escalado listo: ${escalado.tallaOrigen} → ${escalado.tallaDestino} con un ${aumento}% de crecimiento.`)
    setMensaje(`Escalado preparado para ${escalado.tallaOrigen} a ${escalado.tallaDestino}`)
  }

  const guardarMoldeEscalado = () => {
    if (!moldeEscalado) return
    setMoldes((prev) => [
      {
        id_molde: Date.now(),
        codigo_molde: moldeEscalado.codigo,
        nombre_molde: moldeEscalado.nombre,
        tipo_prenda: moldeEscalado.tipo,
        estado: moldeEscalado.estado
      },
      ...prev
    ])
    setMensaje(`Molde escalado guardado como ${moldeEscalado.nombre}`)
  }

  const compartirResumen = async () => {
    const texto = moldeEscalado
      ? `Molde: ${moldeEscalado.nombre}\nCódigo: ${moldeEscalado.codigo}\nTipo: ${moldeEscalado.tipo}\nEstado: ${moldeEscalado.estado}`
      : 'No hay un molde escalado para compartir.'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resumen de molde',
          text: texto
        })
        setMensaje('Resumen compartido correctamente.')
      } catch {
        setMensaje('Se canceló el compartir.')
      }
      return
    }

    try {
      await navigator.clipboard.writeText(texto)
      setMensaje('Resumen copiado al portapapeles.')
    } catch {
      setMensaje('No fue posible copiar el resumen.')
    }
  }

  const descargarResumen = () => {
    const texto = moldeEscalado
      ? `Molde: ${moldeEscalado.nombre}\nCódigo: ${moldeEscalado.codigo}\nTipo: ${moldeEscalado.tipo}\nEstado: ${moldeEscalado.estado}\nMedidas: ${medidasEscaladas.map((item) => `${item.nombre}: ${item.valor} cm`).join(', ')}`
      : 'No hay datos para descargar.'

    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'resumen-molde.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setMensaje('Resumen descargado como archivo de texto.')
  }

  const imprimirResumen = () => {
    if (!moldeEscalado) {
      setMensaje('No hay un molde escalado para imprimir.')
      return
    }

    const contenido = `
      <h2>Resumen de molde</h2>
      <p><strong>Molde:</strong> ${moldeEscalado.nombre}</p>
      <p><strong>Código:</strong> ${moldeEscalado.codigo}</p>
      <p><strong>Tipo:</strong> ${moldeEscalado.tipo}</p>
      <p><strong>Estado:</strong> ${moldeEscalado.estado}</p>
      <h3>Medidas</h3>
      <ul>${medidasEscaladas.map((item) => `<li>${item.nombre}: ${item.valor} cm</li>`).join('')}</ul>
    `

    const ventana = window.open('', '', 'width=800,height=600')
    if (!ventana) {
      setMensaje('No se pudo abrir la ventana de impresión.')
      return
    }

    ventana.document.write(`<!doctype html><html><head><title>Resumen de molde</title><style>body{font-family:Arial,sans-serif;padding:24px;}h2{color:#1d4ed8;}li{margin-bottom:6px;}</style></head><body>${contenido}</body></html>`)
    ventana.document.close()
    ventana.focus()
    ventana.print()
    setMensaje('Ventana de impresión abierta.')
  }

  const abrirDetalle = (molde) => {
    setDetalleMolde({
      codigo: molde.codigo_molde || molde.codigo || 'SIN-CODIGO',
      nombre: molde.nombre_molde || molde.nombre || 'Molde sin nombre',
      tipo: molde.tipo_prenda || molde.tipo || 'Sin tipo',
      estado: molde.estado || 'Borrador',
      piezas: ['Delantero', 'Espalda', 'Manga', 'Cuello'],
      observaciones: 'Prenda lista para revisión técnica y producción.',
      medidas: [
        { nombre: 'Pecho', valor: '96 cm' },
        { nombre: 'Cintura', valor: '78 cm' },
        { nombre: 'Largo', valor: '65 cm' },
        { nombre: 'Manga', valor: '60 cm' }
      ]
    })
    setMensaje(`Detalle abierto para ${molde.nombre_molde || molde.nombre}`)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h3>MC</h3>
          <span>Moldes & Confección</span>
          <div style={{ marginTop: 8 }}>
            {user ? (
              <div>
                <small style={{ display: 'block' }}>Conectado: {user.nombre_usuario}</small>
                <button onClick={() => { localStorage.removeItem('moldes_token'); localStorage.removeItem('moldes_user'); setToken(''); setUser(null); setMensaje('Sesión cerrada') }} style={{ marginTop: 6 }}>Cerrar sesión</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <input placeholder="Usuario" value={credentials.nombre_usuario} onChange={(e) => setCredentials({ ...credentials, nombre_usuario: e.target.value })} />
                <input type="password" placeholder="Contraseña" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <button onClick={async () => {
                  try {
                    setCargando(true)
                    const res = await fetch('http://localhost:3001/api/auth/login', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(credentials)
                    })
                    if (!res.ok) {
                      const err = await res.json().catch(() => ({}))
                      throw new Error(err.error || 'Error en login')
                    }
                    const data = await res.json()
                    if (data.token) {
                      localStorage.setItem('moldes_token', data.token)
                      localStorage.setItem('moldes_user', JSON.stringify(data.user))
                      setToken(data.token)
                      setUser(data.user)
                      setMensaje('Inicio de sesión correcto')
                      setCredentials({ nombre_usuario: '', password: '' })
                    }
                  } catch (err) {
                    setMensaje(err.message || 'Error en login')
                  } finally { setCargando(false) }
                }}>Iniciar sesión</button>
              </div>
            )}
          </div>
        </div>
        <nav className="nav-links">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-button ${seccionActiva === item.id ? 'active' : ''}`}
              onClick={() => setSeccionActiva(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="content-area">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Software de Moldes de Confección</p>
            <h1>{vistas[seccionActiva].title}</h1>
            <p className="description">{vistas[seccionActiva].description}</p>
          </div>
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-title">Moldes</span>
              <strong>{moldes.length}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-title">Estado</span>
              <strong>Activo</strong>
            </div>
            <div className="stat-box">
              <span className="stat-title">Operación</span>
              <strong>Digital</strong>
            </div>
          </div>
        </section>

        <section className="trend-panel">
          <div className="list-header">
            <h2>Tendencias de moda recientes</h2>
            <span className="pill">2026</span>
          </div>
          <div className="trend-grid">
            {tendenciasModa.map((tendencia) => (
              <article className="trend-card" key={tendencia.titulo}>
                <h3>{tendencia.titulo}</h3>
                <p>{tendencia.descripcion}</p>
                <span>{tendencia.impacto}</span>
              </article>
            ))}
          </div>
        </section>

        {seccionActiva === 'moldes' ? (
          <section className="panel">
            <form onSubmit={guardarMolde} className="form-card">
              <div className="list-header">
                <h2>Registrar nuevo molde</h2>
                <span className="pill">Crear + Escalar</span>
              </div>
              <input
                placeholder="Código del molde"
                value={form.codigo_molde}
                onChange={(e) => setForm({ ...form, codigo_molde: e.target.value })}
                required
              />
              <input
                placeholder="Nombre del molde"
                value={form.nombre_molde}
                onChange={(e) => setForm({ ...form, nombre_molde: e.target.value })}
                required
              />
              <select value={form.tipo_prenda} onChange={(e) => setForm({ ...form, tipo_prenda: e.target.value })}>
                <option value="blusa">Blusa</option>
                <option value="falda">Falda</option>
                <option value="vestido">Vestido</option>
                <option value="pantalon">Pantalón</option>
                <option value="chaqueta">Chaqueta</option>
              </select>
              <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                <option value="borrador">Borrador</option>
                <option value="aprobado">Aprobado</option>
                <option value="en produccion">En producción</option>
              </select>
              <div className="actions">
                <button type="submit">Crear molde</button>
                <button type="button" className="secondary" onClick={() => setSeccionActiva('moldes')}>Escalar molde</button>
              </div>
              {mensaje && <p className={`mensaje ${mensaje.includes('correctamente') ? 'success' : 'error'}`}>{mensaje}</p>}
              {cargando && <p className="hint">Cargando moldes...</p>}
            </form>

            <form onSubmit={escalarMolde} className="form-card">
              <div className="list-header">
                <h2>Escalar molde</h2>
                <span className="pill">Tallas</span>
              </div>
              <select value={escalado.tallaOrigen} onChange={(e) => setEscalado({ ...escalado, tallaOrigen: e.target.value })}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <select value={escalado.tallaDestino} onChange={(e) => setEscalado({ ...escalado, tallaDestino: e.target.value })}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <input
                type="number"
                placeholder="Porcentaje de crecimiento"
                value={escalado.porcentaje}
                onChange={(e) => setEscalado({ ...escalado, porcentaje: e.target.value })}
              />
              <div className="actions">
                <button type="submit">Aplicar escalado</button>
              </div>
              {resultadoEscalado && <p className="mensaje success">{resultadoEscalado}</p>}
              {medidasEscaladas.length > 0 && (
                <div className="escalado-card">
                  <h3>Medidas calculadas</h3>
                  <table className="tabla-medidas">
                    <thead>
                      <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medidasEscaladas.map((item) => (
                        <tr key={item.nombre}>
                          <td>{item.nombre}</td>
                          <td>{item.valor} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="actions">
                    <button type="button" className="secondary" onClick={guardarMoldeEscalado}>Guardar como molde</button>
                    <button type="button" className="secondary" onClick={compartirResumen}>Compartir</button>
                    <button type="button" className="secondary" onClick={descargarResumen}>Descargar</button>
                    <button type="button" className="secondary" onClick={imprimirResumen}>Imprimir</button>
                  </div>
                </div>
              )}
            </form>

            <div className="list-card">
              <div className="list-header">
                <h2>Moldes de referencia</h2>
                <span className="pill">Ejemplos visuales</span>
              </div>
              <div className="demo-grid">
                {moldesDestacados.map((molde) => (
                  <article className="mold-demo-card" key={molde.codigo}>
                    <div className="mold-demo-header">
                      <h3>{molde.nombre}</h3>
                      <span className="pill">{molde.tipo}</span>
                    </div>
                    <p className="mold-code">Código: {molde.codigo}</p>
                    <p className="mold-state">Estado: {molde.estado}</p>
                    <div className="mold-meta">
                      <div>
                        <h4>Piezas</h4>
                        <ul>
                          {molde.piezas.map((pieza) => (
                            <li key={pieza}>{pieza}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Medidas</h4>
                        <ul>
                          {molde.medidas.map((medida) => (
                            <li key={medida}>{medida}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="list-card">
              <div className="list-header">
                <h2>Moldes registrados</h2>
                <span className="pill">Últimos registros</span>
              </div>
              {moldes.length === 0 ? (
                <p>No hay moldes aún.</p>
              ) : (
                <ul>
                  {moldes.map((molde) => (
                    <li key={molde.id_molde}>
                      <strong>{molde.nombre_molde}</strong>
                      <span>{molde.codigo_molde}</span>
                      <span>{molde.tipo_prenda}</span>
                      <span>{molde.estado}</span>
                      <button type="button" className="secondary small" onClick={() => abrirDetalle(molde)}>Ver detalle</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detalleMolde && (
              <div className="list-card detalle-card">
                <div className="list-header">
                  <h2>Detalle del molde</h2>
                  <span className="pill">Vista técnica</span>
                </div>
                <div className="detalle-grid">
                  <div>
                    <p><strong>Nombre:</strong> {detalleMolde.nombre}</p>
                    <p><strong>Código:</strong> {detalleMolde.codigo}</p>
                    <p><strong>Tipo:</strong> {detalleMolde.tipo}</p>
                    <p><strong>Estado:</strong> {detalleMolde.estado}</p>
                  </div>
                  <div>
                    <p><strong>Observaciones:</strong> {detalleMolde.observaciones}</p>
                    <p><strong>Piezas:</strong></p>
                    <ul>
                      {detalleMolde.piezas.map((pieza) => (
                        <li key={pieza}>{pieza}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="detalle-medidas">
                  <h3>Medidas base</h3>
                  <ul>
                    {detalleMolde.medidas.map((medida) => (
                      <li key={medida.nombre}>{medida.nombre}: {medida.valor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="panel">
            <div className="form-card">
              <h2>{vistas[seccionActiva].title}</h2>
              <p className="placeholder-text">Esta sección está preparada para gestionar {seccionActiva} con el mismo estilo del sistema.</p>
              <div className="actions">
                <button type="button" className="secondary">Próximamente</button>
              </div>
            </div>
            <div className="list-card">
              <div className="list-header">
                <h2>Resumen</h2>
                <span className="pill">En desarrollo</span>
              </div>
              <ul>
                <li><strong>Acceso rápido</strong><span>Operaciones pendientes</span></li>
                <li><strong>Seguimiento</strong><span>Estado del módulo</span></li>
                <li><strong>Registro</strong><span>Datos del sistema</span></li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default App

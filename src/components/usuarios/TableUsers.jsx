import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useSelector } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive'
import { ModalCreateUser } from './ModalCreateUser'
import { Pagination } from './Pagination'
import { TableSpreedList } from './TableSpreedList'

export const TableUsers = () => {

    const { usuarios } = useSelector(state => state.auth);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    let usuariosFilter = []

    const [usuariosFiltro, setUsuariosFiltro] = useState([])

    usuarios?.map(e => usuariosFilter.push({ label: e?.name, value: e?.id, team: false }))

    let options = usuariosFilter

    const usuarioParaList = usuarios?.filter(usuarios => usuariosFiltro?.some(usuarioss => usuarioss?.value === usuarios?.id))

    const [ respWidth ] = useResponsive()

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        setCurrentPage(0)
    }, [])
    
    const ref = useRef(null)

    const [noshow, setNoshow] = useState(true)
    
  return (
    <div className='container'>

        <MultiSelect
            options={options}
            value={usuariosFiltro}
            onChange={setUsuariosFiltro}
            labelledBy="Select"
            hasSelectAll = {false}
        />

        <div className='text-right'>
            <button onClick={() => setShowModalCreateUser(true)} className='btn btn-primary my-1'>Crear un usuario</button>
        </div>

        <div class="form-check text-right">
            <input className="form-check-input" defaultChecked={!noshow} onClick={() => setNoshow(!noshow)} type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label mr-4" for="flexCheckDefault">
                Mostrar usuarios inactivos
            </label>
        </div>
        
        <div className='table-responsive shadow py-4 px-1' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '550px'}}>
            <table ref = {ref} className="table borderless">
                <thead>
                    <tr>
                        {
                            (respWidth > 992)
                                &&
                            <th scope="col">Foto</th>
                        }
                        <th scope="col">Nombre</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Equipo</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <TableSpreedList usuariosFiltro = {(usuarioParaList?.length !== 0) ? usuarioParaList : usuarios} currentPage = {currentPage} noshow = {noshow} />
                </tbody>
            </table>
        </div>
        
        <div className='mt-3'>
            <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {(usuarioParaList?.length !== 0) ? usuarioParaList : usuarios} element = {ref?.current} />
        </div>

        <ModalCreateUser showModalCreateUser={showModalCreateUser} setShowModalCreateUser = {setShowModalCreateUser} />
    </div>
  )
}

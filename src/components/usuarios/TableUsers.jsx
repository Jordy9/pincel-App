import React from 'react'
import { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useSelector } from 'react-redux'
import { ModalCreateUser } from './ModalCreateUser'
import { TableSpreedList } from './TableSpreedList'

export const TableUsers = () => {

    const { usuarios } = useSelector(state => state.auth);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    let usuariosFilter = []

    const [usuariosFiltro, setUsuariosFiltro] = useState([])

    usuarios?.map(e => usuariosFilter.push({ label: e?.name, value: e?.id, team: false }))

    let options = usuariosFilter

    const usuarioParaList = usuarios?.filter(usuarios => usuariosFiltro?.some(usuarioss => usuarioss?.value === usuarios?.id))
    
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
        
        <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '550px'}}>
            <table className="table borderless">
                <thead>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo electrónico</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <TableSpreedList usuariosFiltro = {(usuarioParaList?.length !== 0) ? usuarioParaList : usuarios} />
                </tbody>
            </table>
        </div>

        <ModalCreateUser showModalCreateUser={showModalCreateUser} setShowModalCreateUser = {setShowModalCreateUser} />
    </div>
  )
}

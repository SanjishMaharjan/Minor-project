import { BiAddToQueue } from 'react-icons/bi'
import { MdOutlineEventNote } from 'react-icons/md'
import { HiOutlineDocumentRemove } from 'react-icons/hi'
import { GoTasklist } from 'react-icons/go'
import "./ManageEvents.css"
import { Link, useNavigate } from 'react-router-dom'
import AddEventForm from './AddEventForm'


const ManageEvents = () => {
    const navigate = useNavigate();
    return (
        <div className="main-container">
            <h1 ><GoTasklist />
                All Events </h1>

            <h1 className='manage-events'><MdOutlineEventNote />
                Manage Events</h1>
            <div className='events-handler'>
                <h3><BiAddToQueue className='admin-icons' />
                    Add </h3>
                <h3><HiOutlineDocumentRemove className='admin-icons' />
                    Remove </h3>
            </div>
            <AddEventForm />
        </div >
    )
}

export default ManageEvents

import React from 'react'
import { MdOutlinePoll, MdDescription, MdOutlineSubtitles } from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'
import { ImProfile } from 'react-icons/im'
import { Form } from 'react-router-dom'

const CreatePoll = () => {
    return (

        <div className="main-container">
            <div className='box-admin'>
                <h1><MdOutlinePoll />Create Polls</h1>
                <Form method='post' action='/admin/editcontent' encType="multipart/form-data">
                    <div className="events-details">
                        <label htmlFor="post"><MdOutlineSubtitles /> Topic of Poll</label>
                        <input
                            type="text"
                            placeholder="post"
                            name="post"
                            id="post"
                            autoComplete="off"
                        />
                        <label htmlFor="description"><MdDescription /> Description</label>
                        <textarea
                            type="text-area"
                            placeholder="Description"
                            name="description"
                            id="description"
                            autoComplete="off"
                        />
                        <label htmlFor="name"><ImProfile /> Canditate Name</label>
                        <input
                            type="text"
                            placeholder="name"
                            id="name"
                            name="name"
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit">Post</button>
                </Form>

            </div>
        </div>

    )
}

export default CreatePoll

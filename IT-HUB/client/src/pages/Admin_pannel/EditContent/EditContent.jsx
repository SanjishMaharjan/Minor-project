import React from 'react'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { RiGalleryLine } from 'react-icons/ri'
import { MdOutlineSubtitles, MdDescription } from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'
import { Form, useNavigation } from 'react-router-dom'
import Loader from '../../../components/Loader'
import "./Editcontent.scss"

const EditContent = () => {
    if (useNavigation().state === 'submitting') return <Loader />;
    return (
        <div className="main-container">
            {/* <h1><HiOutlineWrenchScrewdriver style={{ fontSize: "7rem" }} /><br />
                Edit Content</h1> */}
            <h1><RiGalleryLine />  Update Gallery </h1>
            <div className='box-admin'>
                <Form method='post' action='/admin/editcontent' encType="multipart/form-data">
                    <div className="events-details">
                        <label htmlFor="title"><MdOutlineSubtitles /> Title</label>
                        <input
                            type="text"
                            placeholder="title"
                            name="title"
                            id="title"
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
                        <label htmlFor="img-input">
                            {<BiImageAdd className="admin-icons" />}
                            <input
                                style={{ display: "none", marginTop: "2rem" }}
                                type="file"
                                name="fileUpload"
                                id="img-input"
                                accept=".png,.jpg"
                            />
                        </label>
                    </div>
                    <button type="submit">Post</button>
                </Form>
            </div>
        </div >
    )
}

export default EditContent

import React from 'react'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { RiGalleryLine } from 'react-icons/ri'
import { MdOutlineSubtitles, MdDescription } from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'
import { Form, useNavigation, useActionData, Navigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import "./Editcontent.scss"

const EditContent = () => {
    if (useNavigation().state === 'submitting') return <Loader />;
    const res = useActionData();

    if (res && res.status === 200) return <Navigate to="/events" />;

    const serverError = res?.status === 400 && res?.data?.msg;
    const titleError = res?.status === 403 && res?.data?.errors?.title;
    const descriptionError = res?.status === 403 && res?.data?.errors?.description;
    const fileError = res?.status === 403 && res?.data?.errors?.images;

    return (
        <div className="main-container">
            {/* <h1><HiOutlineWrenchScrewdriver style={{ fontSize: "7rem" }} /><br />
                Edit Content</h1> */}
            <div className='box-admin'>
                <h1><RiGalleryLine />  Update Gallery </h1>
                <Form method='post' action='/admin/editcontent'>
                    <p>{serverError ?? null}</p>
                    <div className="events-details">
                        <label htmlFor="title"><MdOutlineSubtitles /> Title</label>
                        <input
                            type="text"
                            placeholder="title"
                            name="title"
                            id="title"
                            autoComplete="off"
                        />
                        <p>{titleError ?? null}</p>
                        <label htmlFor="description"><MdDescription /> Description</label>
                        <textarea
                            type="text-area"
                            placeholder="Description"
                            name="description"
                            id="description"
                            autoComplete="off"
                        />
                        <p>{descriptionError ?? null}</p>
                        <label htmlFor="img-input">
                            {<BiImageAdd className="admin-icons" />}
                            <input
                                style={{ display: "none", marginTop: "2rem" }}
                                type="file"
                                name="images"
                                id="img-input"
                                accept=".png,.jpg"
                            />
                        </label>
                        <p>{fileError ?? null}</p>
                    </div>
                    <button type="submit">Post</button>
                </Form>
            </div>
        </div >
    )
}

export default EditContent

import { ProjectType } from 'container/Main/Main'
import { update, ref, getDatabase, get, child } from 'firebase/database'
import './EditProject.scss'

type Props = {
    editProject: ProjectType
    setEditProject: (prevState: ProjectType) => void
    setEditFormState: (prevState: boolean) => void
}

const EditProject = ({
    editProject,
    setEditProject,
    setEditFormState,
}: Props) => {
    const handleChangeProjectCountry = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeProjectSalary = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            location: e.target.value,
        }))
    }
    const handleChangeProjectSex = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            sex: e.target.value,
        }))
    }
    const handleChangeProjectAgeFrom = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            ageFrom: e.target.value,
        }))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            ageTo: e.target.value,
        }))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            nationalaty: e.target.value,
        }))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            additionalInfo: e.target.value,
        }))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            housing: e.target.value,
        }))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            projectInfo: e.target.value,
        }))
    }

    const closeEditForm = () => {
        setEditFormState(false)
    }

    const onEditClick = (
        country: string,
        salary: string,
        projectName: string,
        location: string,
        sex: string,
        ageFrom: string,
        ageTo: string,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string
    ) => {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot.val().hasOwnProperty(editProject.projectName)
                    ) {
                        const db = getDatabase()
                        const projectData = {
                            country: country,
                            salary: salary,
                            projectName: projectName,
                            location: location,
                            sex: sex,
                            ageFrom: ageFrom,
                            ageTo: ageTo,
                            nationalaty: nationalaty,
                            additionalInfo: additionalInfo,
                            housing: housing,
                            projectInfo: projectInfo,
                        }
                        const updates = {}
                        /* @ts-ignore*/
                        updates[`vacancy/${projectName}`] = projectData
                        /* @ts-ignore*/
                        setEditProject(() => ({
                            country: '',
                            salary: '',
                            projectName: '',
                            location: '',
                            sex: '',
                            ageFrom: '',
                            ageTo: '',
                            nationalaty: '',
                            additionalInfo: '',
                            housing: '',
                            projectInfo: '',
                        }))
                        return update(ref(db), updates)
                    } else {
                        alert('???????????? ?????????????? ???? ??????????')
                    }
                } else {
                    console.log('No data available')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            editProject.country === '' ||
            editProject.salary === '' ||
            editProject.projectName === '' ||
            editProject.location === '' ||
            editProject.sex === '' ||
            editProject.ageFrom === '' ||
            editProject.ageTo === '' ||
            editProject.nationalaty === '' ||
            editProject.additionalInfo === '' ||
            editProject.housing === '' ||
            editProject.projectInfo === '' ||
            editProject.country === 'empty' ||
            editProject.sex === 'empty'
        ) {
            alert("?????? ???????? ????????'????????????")
        } else {
            onEditClick(
                editProject.country,
                editProject.salary,
                editProject.projectName,
                editProject.location,
                editProject.sex,
                editProject.ageFrom,
                editProject.ageTo,
                editProject.nationalaty,
                editProject.additionalInfo,
                editProject.housing,
                editProject.projectInfo
            )
            setEditFormState(false)
        }
    }

    return (
        <div className="project-edit-form">
            <div className="project-edit-header">
                <p>?????????????????????????? ????????????</p>
                <button onClick={closeEditForm}>X</button>
            </div>
            <form onSubmit={onSendClick}>
                <label htmlFor="country">?????????? ????????????</label>
                <select
                    name="country"
                    id="edit-country"
                    form="add-project"
                    value={editProject.country}
                    onChange={handleChangeProjectCountry}
                >
                    <option value="empty"></option>
                    <option value="????????????">????????????</option>
                    <option value="??????????">??????????</option>
                    <option value="??????????????">??????????????</option>
                    <option value="????????????????">????????????????</option>
                    <option value="??????????">??????????</option>
                    <option value="??????????????????">??????????????????</option>
                    <option value="????????????????">????????????????</option>
                    <option value="????????????">????????????</option>
                    <option value="??????????????">??????????????</option>
                    <option value="????????">????????</option>
                </select>
                <label htmlFor="sex">?????????? ????????</label>
                <select
                    name="sex"
                    id="edit-sex"
                    form="add-project"
                    value={editProject.sex}
                    onChange={handleChangeProjectSex}
                >
                    <option value="??????????????">??????????????</option>
                    <option value="??????????????">??????????????</option>
                    <option value="????????">????????</option>
                </select>
                <input
                    type="text"
                    id="edit-salary"
                    placeholder="????????????"
                    value={editProject.salary}
                    onChange={handleChangeProjectSalary}
                />
                <input
                    type="text"
                    id="edit-project"
                    placeholder="???????????????? ??????????????"
                    value={editProject.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="edit-location"
                    placeholder="??????????????????????"
                    value={editProject.location}
                    onChange={handleChangeProjectLocation}
                />
                <div>
                    <input
                        type="text"
                        id="edit-age-from"
                        placeholder="?????????????? ????"
                        value={editProject.ageFrom}
                        maxLength={2}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <input
                        type="text"
                        id="edit-age-to"
                        placeholder="?????????????? ????"
                        value={editProject.ageTo}
                        maxLength={2}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <input
                    type="text"
                    id="edit-nationalaty"
                    placeholder="????????????????????????????"
                    value={editProject.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="edit-additionalInfo"
                    placeholder="???????????????????????????? ????????????????????"
                    value={editProject.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="edit-housing"
                    placeholder="?????????????? ??????????"
                    value={editProject.housing}
                    onChange={handleChangeProjectHousing}
                />
                <textarea
                    name="projectInfo"
                    id="edit-projectInfo"
                    placeholder="???????????????? ??????????????"
                    cols={30}
                    rows={10}
                    value={editProject.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                ></textarea>
                <button type="submit">?????????????????????????? ????????????</button>
            </form>
        </div>
    )
}

export default EditProject

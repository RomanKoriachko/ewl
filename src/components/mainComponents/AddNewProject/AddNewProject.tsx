import { ProjectType } from 'container/Main/Main'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import './AddNewProject.scss'

type Props = {
    project: ProjectType
    setNewProject: (prevState: ProjectType) => void
}

const AddNewProject = ({ project, setNewProject }: Props) => {
    const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            location: e.target.value,
        }))
    }
    const handleChangeProjectSex = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            sex: e.target.value,
        }))
    }
    const handleChangeProjectAgeFrom = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            ageFrom: e.target.value,
        }))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            ageTo: e.target.value,
        }))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            nationalaty: e.target.value,
        }))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            additionalInfo: e.target.value,
        }))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            housing: e.target.value,
        }))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectInfo: e.target.value,
        }))
    }

    const db = getDatabase()

    function writeProjectData(
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
    ) {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().hasOwnProperty(project.projectName)) {
                        alert('???????????? ?????? ????????????????????')
                        /* @ts-ignore */
                        setNewProject(() => ({
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
                    } else {
                        set(ref(db, `vacancy/${projectName}/`), {
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
                        })
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
            project.country === '' ||
            project.salary === '' ||
            project.projectName === '' ||
            project.location === '' ||
            project.sex === '' ||
            project.ageFrom === '' ||
            project.ageTo === '' ||
            project.nationalaty === '' ||
            project.additionalInfo === '' ||
            project.housing === '' ||
            project.projectInfo === ''
        ) {
            alert('?????? ???????? ?????????????????????? ?????? ????????????????????')
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName,
                project.location,
                project.sex,
                project.ageFrom,
                project.ageTo,
                project.nationalaty,
                project.additionalInfo,
                project.housing,
                project.projectInfo
            )
            /* @ts-ignore */
            setNewProject(() => ({
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
        }
    }

    return (
        <div className="project-form">
            <p>???????????????? ????????????</p>
            <form onSubmit={onSendClick} id="add-project">
                <label htmlFor="country">?????????? ????????????</label>
                <select
                    name="country"
                    id="country"
                    form="add-project"
                    value={project.country}
                    onChange={handleChangeCountry}
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
                    id="sex"
                    form="add-project"
                    value={project.sex}
                    onChange={handleChangeProjectSex}
                >
                    <option value="empty"></option>
                    <option value="??????????????">??????????????</option>
                    <option value="??????????????">??????????????</option>
                    <option value="????????">????????</option>
                </select>
                <input
                    type="text"
                    id="salary"
                    placeholder="????????????"
                    value={project.salary}
                    onChange={handleChangeSalary}
                />
                <input
                    type="text"
                    id="project"
                    placeholder="???????????????? ??????????????"
                    value={project.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="location"
                    placeholder="??????????????????????"
                    value={project.location}
                    onChange={handleChangeProjectLocation}
                />
                <div>
                    <input
                        type="text"
                        id="age-from"
                        placeholder="?????????????? ????"
                        value={project.ageFrom}
                        maxLength={2}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <input
                        type="text"
                        id="age-to"
                        placeholder="?????????????? ????"
                        value={project.ageTo}
                        maxLength={2}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <input
                    type="text"
                    id="nationalaty"
                    placeholder="????????????????????????????"
                    value={project.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="additionalInfo"
                    placeholder="???????????????????????????? ????????????????????"
                    value={project.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="housing"
                    placeholder="?????????????? ??????????"
                    value={project.housing}
                    onChange={handleChangeProjectHousing}
                />
                <textarea
                    name="projectInfo"
                    id="projectInfo"
                    placeholder="???????????????? ??????????????"
                    cols={30}
                    rows={10}
                    value={project.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                ></textarea>
                <button type="submit">???????????????? ????????????</button>
            </form>
        </div>
    )
}

export default AddNewProject

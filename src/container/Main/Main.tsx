import './Main.scss'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState } from 'react'
import RegistrationAndLogin from 'components/mainComponents/RegistrationAndLogin/RegistrationAndLogin'

type Props = {}

export type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

type ProjectType = {
    country: string
    salary: string
    projectName: string
}

const Main = (props: Props) => {
    const [registrationData, setRegistrationData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
        isAdmin: false,
    })
    const [loginData, setLoginData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
        isAdmin: false,
    })

    // ----------------------------- write data --------------------------------

    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
    })

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }

    const db = getDatabase()
    const starCountRef = ref(db, `vacancy/`)

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string
    ) {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data)
            if (data.hasOwnProperty(project.projectName)) {
                setNewProject(() => ({
                    country: '',
                    salary: '',
                    projectName: '',
                }))
            } else {
                set(ref(db, `vacancy/${projectName}/`), {
                    country: country,
                    salary: salary,
                })
            }
        })
    }

    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            project.country === '' ||
            project.salary === '' ||
            project.projectName === ''
        ) {
            alert("всі поля обов'язкові")
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName
            )
            setNewProject(() => ({
                country: '',
                salary: '',
                projectName: '',
            }))
        }
    }

    // ----------------------------- read data -----------------------------

    let newDataArr
    let newData = {}
    onValue(starCountRef, (snapshot) => {
        newData = snapshot.val()
        newDataArr = newData
    })

    /* @ts-ignore */
    let projectsArr
    newDataArr !== undefined
        ? (projectsArr = Object.entries(newDataArr))
        : (projectsArr = [])

    return (
        <div>
            <div className="container">
                {loginData.isAdmin ? (
                    <div>
                        <div className="add-project">
                            <p>Додати проект</p>
                            <form onSubmit={onSendClick}>
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Назва країни"
                                    value={project.country}
                                    onChange={handleChangeCountry}
                                />
                                <input
                                    type="text"
                                    id="salary"
                                    placeholder="Ставка"
                                    value={project.salary}
                                    onChange={handleChangeSalary}
                                />
                                <input
                                    type="text"
                                    id="project"
                                    placeholder="назва проекту"
                                    value={project.projectName}
                                    onChange={handleChangeProjectName}
                                />
                                <button type="submit">Додати проект</button>
                            </form>
                        </div>
                        <div className="show-projects">
                            <div className="projects">
                                {
                                    /* @ts-ignore */
                                    projectsArr.map((element, i) => (
                                        <div key={i} className="project-item">
                                            <div className="project-item-header">
                                                <p>Назва проекту</p>
                                                <div>{element[0]}</div>
                                            </div>
                                            <div className="project-item-country">
                                                <p>Країна</p>
                                                <div>{element[1].country}</div>
                                            </div>
                                            <div className="project-item-salary">
                                                <p>Cтавка в злотих</p>
                                                <div>{element[1].salary}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : loginData.hasAccount ? (
                    <div className="show-projects">
                        <div className="projects">
                            {
                                /* @ts-ignore */
                                projectsArr.map((element, i) => (
                                    <div key={i} className="project-item">
                                        <div className="project-item-header">
                                            <p>Назва проекту</p>
                                            {element[0]}
                                        </div>
                                        <div className="project-item-country">
                                            <p>Країна</p>
                                            {element[1].country}
                                        </div>
                                        <div className="project-item-salary">
                                            <p>Cтавка в злотих</p>
                                            {element[1].salary}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <RegistrationAndLogin
                        loginData={loginData}
                        registrationData={registrationData}
                        setLoginData={setLoginData}
                        setRegistrationData={setRegistrationData}
                    />
                )}
            </div>
        </div>
    )
}

export default Main

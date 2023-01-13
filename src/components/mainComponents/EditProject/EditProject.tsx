import { update, ref, getDatabase, get, child } from 'firebase/database'
import {
    addNewEditedSex,
    deliteEditedProjectData,
    editCategory,
    editCountry,
    editProjectAdditionalInfo,
    editProjectAgeFrom,
    editProjectAgeTo,
    editProjectHousing,
    editProjectInfo,
    editProjectLocation,
    editProjectName,
    editProjectNationality,
    editSalary,
    editSex,
} from 'redux/editProjectReduser'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import './EditProject.scss'

type Props = {
    setEditFormState: (prevState: boolean) => void
}

//
const EditProject = ({ setEditFormState }: Props) => {
    const editProjectState = useAppSelector((state) => state.editProjectState)
    const dispatch = useAppDispatch()

    const handleChangeProjectCountry = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        dispatch(editCountry(e.target.value))
    }
    const handleChangeProjectSalary = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editSalary(e.target.value))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectName(e.target.value))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectLocation(e.target.value))
    }
    const handleChangeProjectCategory = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editCategory(e.target.value))
    }

    let checkboxMale = document.querySelector('.chechbox-male-edit')
    let checkboxFemale = document.querySelector('.chechbox-female-edit')
    let checkboxCouples = document.querySelector('.chechbox-couples-edit')

    if (editProjectState.sex.includes('Мужчины')) {
        /* @ts-ignore */
        checkboxMale.checked = true
    } else if (checkboxMale !== null) {
        /* @ts-ignore */
        checkboxMale.checked = false
    }
    if (editProjectState.sex.includes('Женщины')) {
        /* @ts-ignore */
        checkboxFemale.checked = true
    } else if (checkboxFemale !== null) {
        /* @ts-ignore */
        checkboxFemale.checked = false
    }
    if (editProjectState.sex.includes('Пары')) {
        /* @ts-ignore */
        checkboxCouples.checked = true
    } else if (checkboxCouples !== null) {
        /* @ts-ignore */
        checkboxCouples.checked = false
    }

    const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(editSex(e.target.value))
        } else if (editProjectState.sex.includes(e.target.value)) {
            let tempStr = editProjectState.sex
            let newStr = tempStr.replace(e.target.value, '')
            newStr.trim()
            dispatch(addNewEditedSex(newStr.trim()))
        }
    }

    const handleChangeProjectAgeFrom = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(editProjectAgeFrom(onlyNumbers))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(editProjectAgeTo(onlyNumbers))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectNationality(e.target.value))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectAdditionalInfo(e.target.value))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectHousing(e.target.value))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(editProjectInfo(e.target.value))
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
        ageFrom: number,
        ageTo: number,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string,
        category: string
    ) => {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot
                            .val()
                            .hasOwnProperty(editProjectState.projectName)
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
                            category: category,
                        }
                        const updates = {}
                        /* @ts-ignore*/
                        updates[`vacancy/${projectName}`] = projectData
                        dispatch(deliteEditedProjectData(''))
                        return update(ref(db), updates)
                    } else {
                        alert('Такого проекта не существует')
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
            editProjectState.country === '' ||
            editProjectState.salary === '' ||
            editProjectState.projectName === '' ||
            editProjectState.location === '' ||
            editProjectState.ageFrom === undefined ||
            editProjectState.ageTo === undefined ||
            editProjectState.nationalaty === '' ||
            editProjectState.additionalInfo === '' ||
            editProjectState.housing === '' ||
            editProjectState.projectInfo === '' ||
            editProjectState.country === 'empty' ||
            editProjectState.sex === 'empty' ||
            editProjectState.category === '' ||
            (!editProjectState.sex.includes('Мужчины') &&
                !editProjectState.sex.includes('Женщины') &&
                !editProjectState.sex.includes('Пары'))
        ) {
            alert('все поля обязательні для заполнения')
        } else if (editProjectState.ageFrom > editProjectState.ageTo) {
            alert('Возраст От не может быть больше возраста До')
        } else {
            onEditClick(
                editProjectState.country,
                editProjectState.salary,
                editProjectState.projectName,
                editProjectState.location,
                editProjectState.sex,
                editProjectState.ageFrom,
                editProjectState.ageTo,
                editProjectState.nationalaty,
                editProjectState.additionalInfo,
                editProjectState.housing,
                editProjectState.projectInfo,
                editProjectState.category
            )
            setEditFormState(false)
        }
    }

    return (
        <div className="project-edit-form">
            <div className="project-edit-header">
                <p className="tablet-header">Редактировать проект</p>
                <button onClick={closeEditForm}></button>
            </div>
            <form onSubmit={onSendClick}>
                <label htmlFor="country">Выбор страны</label>
                <select
                    name="country"
                    id="edit-country"
                    form="add-project"
                    value={editProjectState.country}
                    onChange={handleChangeProjectCountry}
                >
                    <option value="empty"></option>
                    <option value="Польша">Польша</option>
                    <option value="Чехия">Чехия</option>
                    <option value="Румыния">Румыния</option>
                    <option value="Словакия">Словакия</option>
                    <option value="Литва">Литва</option>
                    <option value="Голландия">Голландия</option>
                    <option value="Германия">Германия</option>
                    <option value="Греция">Греция</option>
                    <option value="Испания">Испания</option>
                    <option value="Кипр">Кипр</option>
                </select>
                <div className="sex-select-edit">
                    <p>Выбор пола</p>
                    <div className="row sex-select-row">
                        <div>
                            <input
                                type="checkbox"
                                id="male-edit"
                                name="sex-edit"
                                value="Мужчины"
                                className="chechbox-male-edit"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="male-edit">Мужчины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="female-edit"
                                name="sex-edit"
                                value="Женщины"
                                className="chechbox-female-edit"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="female-edit">Женщины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="couples-edit"
                                name="sex-edit"
                                value="Пары"
                                className="chechbox-couples-edit"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="couples-edit">Пары</label>
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    id="edit-project"
                    placeholder="Название проекта"
                    value={editProjectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="edit-salary"
                    placeholder="Ставка"
                    value={editProjectState.salary}
                    onChange={handleChangeProjectSalary}
                />
                <input
                    type="text"
                    id="edit-location"
                    placeholder="Локализация"
                    value={editProjectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <input
                    type="text"
                    id="edit-category"
                    placeholder="Категория"
                    value={editProjectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-wrapper">
                    <input
                        type="text"
                        id="edit-age-from"
                        placeholder="Возраст От"
                        value={editProjectState.ageFrom}
                        maxLength={2}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <input
                        type="text"
                        id="edit-age-to"
                        placeholder="Возраст До"
                        value={editProjectState.ageTo}
                        maxLength={2}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <input
                    type="text"
                    id="edit-nationalaty"
                    placeholder="Национальность"
                    value={editProjectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="edit-additionalInfo"
                    placeholder="Дополнительная информация"
                    value={editProjectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="edit-housing"
                    placeholder="Примеры жилья"
                    value={editProjectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <textarea
                    name="projectInfo"
                    id="edit-projectInfo"
                    placeholder="Описание проекта"
                    cols={30}
                    rows={10}
                    value={editProjectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                ></textarea>
                <button type="submit">Редактировать проект</button>
            </form>
        </div>
    )
}

export default EditProject

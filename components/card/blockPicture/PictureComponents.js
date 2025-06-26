import TitleCard from '../TitleCard'

const PictureComponents = ({ title, icons, picture }) => {
    return (
        <>
            <div className="container">
                <TitleCard title={title} icons={icons} />

            </div>
        </>
    )
}

export default PictureComponents

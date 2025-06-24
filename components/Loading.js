import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
    return (
        <>
            <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )
}

export default Loading
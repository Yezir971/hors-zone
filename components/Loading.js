import { TailSpin } from 'react-loader-spinner'

const Loading = () => {
    return (
        <>
            <TailSpin
                visible={true}
                height="25"
                width="25"
                color="var(--color-loader)"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )
}

export default Loading

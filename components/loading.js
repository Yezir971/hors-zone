import { TailSpin } from 'react-loader-spinner'

export default function Loading() {
    return (
        <>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#fffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )
}

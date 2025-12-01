type Props = {
    width: number,
}

const Spinner = (props: Props) => {
    const { width } = props;

    return (<>
        <div className={`h-${width} w-${width} rounded-full border-4 border-t-4 border-orange-500 border-t-gray-500 animate-spin`}></div>
    </>)
}

export default Spinner;
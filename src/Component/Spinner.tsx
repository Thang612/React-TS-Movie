type Props = {
    width: number,
}

const Spinner = (props: Props) => {
    const { width } = props;

    return (<>
        <div className="loader"></div>
    </>)
}

export default Spinner;
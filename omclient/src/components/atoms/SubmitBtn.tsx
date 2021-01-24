interface Props {
    submit: (event) => void
    state: any
}

const SubmitBtn = ({ submit, state }: Props) => {
    const validation = (obj) => {
        return Object.values(obj).some((val) => {
            return (val === "")
        });
    }
    return (
        <>
            <input
                className="rounded block my-4 w-full p-4"
                type="submit"
                value="部屋を作成"
                disabled={validation(state)}
                onClick={e => {
                    submit(e)
                }}
            />
        </>
    )
}

export default SubmitBtn;
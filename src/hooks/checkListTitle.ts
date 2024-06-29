const checkListTitle = (data: any) => {
    let a = data.reduce((accumulator: number, currentValue: any) => {
        return JSON.parse(currentValue.status) ? accumulator + 1 : accumulator
    }, 0);
    let b = data.length
    return "Checklist ( " + a + "/" + b + ")"
}

export default checkListTitle
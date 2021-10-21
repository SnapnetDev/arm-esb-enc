export default function Col({...attr}){
    const {children,col} = attr;
    return (<div className={`col-lg-${col} col-${col}`} {...attr} >
        {children}
    </div>);
}
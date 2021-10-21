export const Loading =({loading})=>{

    const style={
     height: '30px'
    };

    if (!loading){
        return (<div style={style}>
        </div>);
    }

    return (<div align="center" style={style}>
        <img src="/loading.gif" style={{width:'24px'}} />
    </div>);
     
};
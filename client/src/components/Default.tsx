import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import {getDefaultAsync} from "../redux/users/thunks";

const Default: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDefaultAsync());
    }, []) // <-- empty dependency array
    return <div></div>
}

export default Default;


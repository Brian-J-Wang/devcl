import { CheckListView, CollaboratorView } from './Views';
import { useContext } from 'react';
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb';

import './Collection.css';
import SideBar from './sidebar/sidebar';
import useTaskDocAPI from '../../Hooks/useTaskDocAPI';
import { Route, Routes, useParams } from 'react-router-dom';
import { UserContext } from '@context/UserContext';

const Collection: React.FC = () => {
    const { id } = useParams();
    const { token } = useContext(UserContext);
    const { taskDoc } = useTaskDocAPI('http://localhost:5081/taskDocs', id ?? '', token);

    return (
        <div className="collection">
            <BreadCrumb />
            <SideBar project={taskDoc} />
            <Routes>
                <Route path="collaborators" element={<CollaboratorView />} />
                <Route path="taskDoc" element={<CheckListView />} />
                <Route path="*" element={<div></div>} />
            </Routes>
        </div>
    );
};

export default Collection;

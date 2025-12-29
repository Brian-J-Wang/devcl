import userProjectContext from '@context/userProjectContext';
import { useContext, useState } from 'react';

import styles from './CollectionProfile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import BoundingBox from '@shared/boundingBox';

type CollectionProfileType = {
    name: string;
};

const CollectionProfile: React.FC<CollectionProfileType> = (props) => {
    const { id: currentCollection } = useParams();
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const { projects } = useContext(userProjectContext);
    const navigate = useNavigate();

    const switchCollection = (id: string) => () => {
        navigate(`../collections/${id}`);
        setDropDownVisible(false);
    };

    return (
        <>
            <div className={styles.body}>
                <div
                    className={styles.profile}
                    onClick={() => {
                        setDropDownVisible(true);
                    }}
                >
                    <div className={styles.contentLeft}>{generateImagePlaceHolder(props.name)}</div>
                    <h1>{props.name}</h1>
                </div>
                {dropDownVisible && (
                    <BoundingBox
                        className={styles.dropDown}
                        onOutOfBound={() => {
                            console.log('here');
                            setDropDownVisible(false);
                        }}
                        disabled={!dropDownVisible}
                    >
                        {projects.length > 1 ? (
                            projects
                                .filter((doc) => doc.id != currentCollection)
                                .map((doc) => (
                                    <div
                                        className={styles.dropDownItem}
                                        key={doc.id}
                                        onClick={switchCollection(doc.id)}
                                    >
                                        {doc.name}
                                    </div>
                                ))
                        ) : (
                            <div> There are no other projects! </div>
                        )}
                    </BoundingBox>
                )}
            </div>
        </>
    );
};

const generateImagePlaceHolder = (name: string) => {
    const names = name.split(' ').map((word) => {
        return word.charAt(0);
    });

    return `${names[0] ?? ''}${names[1] ?? ''}`;
};

export default CollectionProfile;

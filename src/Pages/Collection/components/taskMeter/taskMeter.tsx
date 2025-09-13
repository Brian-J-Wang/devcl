import { Container } from "../../../../Components/Container/Container"
import styles from "./taskMeter.module.css";

const taskTypes: { name: string, color: string }[] = [
    {
        name: "Incomplete",
        color: "something"
    },
    {
        name: "In-Progress",
        color: "something"
    },
    {
        name: "Complete",
        color: "something"
    }
]

type TaskMeterProps = {
    className?: string
}

/** offers a quick way to see which tasks are available */
const TaskMeter: React.FC<TaskMeterProps> = (props) => {
    return (
        <Container className={props.className}>
            {/* <div>

            </div> */}
            <div className={styles.legend}>
                {
                    taskTypes.map((item) => (
                        <div className={styles.item}>
                            <div className={styles.itemColor}></div>
                            {item.name}
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}

export default TaskMeter;
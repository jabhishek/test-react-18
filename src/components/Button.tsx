import styles from './Button.module.css'

console.log('styles', styles);

export const Button = ({ text, onClick }: { text: string, onClick: () => void}) => {
    return <button onClick={onClick} className={styles.button}>{text}</button>
}

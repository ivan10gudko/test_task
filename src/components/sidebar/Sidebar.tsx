import { IoMdClose } from "react-icons/io";
import styles from "./Sidebar.module.css";
import { MenuItem, type MenuItemType } from "./MenuItem";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: MenuItemType[];
}

const Sidebar : React.FC<SidebarProps> = ({ isOpen, onClose, menuItems }) => {
    return (
        <>
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
            onClick={onClose}
        />
        
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.sidebarHeader}>
                <h3>Sidebar Menu</h3>
                <button onClick={onClose} className={styles.closeIcon}>
                    <IoMdClose />
                </button>
            </div>

            <div className={styles.menuList}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </div>
        </aside>
    </>
);
};
export default Sidebar;
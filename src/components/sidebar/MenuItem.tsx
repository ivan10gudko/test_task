import { useState } from "react";
import styles from "./MenuItem.module.css"
import { MdExpandMore } from "react-icons/md";

export interface MenuItemType {
    label: string;
    link?: string;
    children?: MenuItemType[];
}

interface Props {
    item: MenuItemType;
}

export const MenuItem: React.FC<Props> = ({ item }) => {
    const [open, setOpen] = useState(false);

    const hasChildren = Boolean(item.children?.length);

    return (
    <div>
        <div
            className={styles.menuItem}
            onClick={() => hasChildren && setOpen((p) => !p)}
        >
        <span>{item.label}</span>

        {hasChildren && <span className={open ? styles.chevronExpanded : styles.chevron}>
                            <MdExpandMore />
                        </span>
        }
        </div>

    {open && hasChildren && (
        <div className={styles.submenuContainer}>
            {item.children!.map((child) => (
                <MenuItem key={child.label} item={child} />
            ))}
        </div>
    )}
    </div>
);
};

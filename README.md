# Getting Started (Setup Instructions)Follow these steps to run the project locally.
## 1. Clone the repository
```console
git clone <your-repo-url>
```
```console
cd <your-folder-name>
```
## 2. Install dependencies
```console
npm install
```
## 3. Run Storybook (Recommended)
The best way to view components in isolation, explore documentation, and test props via the Controls panel.
```console
npm run storybook
```
Open http://localhost:6006 in your browser.

## 4. Run App Playground
   To see the components integrated into a real React application context (Vite):
   
```console
      npm run dev
```
Open http://localhost:5173 in your browser.

#Component Overview
##The library consists of three main UI components implemented from scratch without using external UI frameworks.
## 1. Smart Input (<Input />)
A versatile input component supporting multiple data types and states. 
It is a fully controlled component.
Key Features:
    Password Toggle: Built-in eye icon to toggle password visibility.
    Clearable: Optional clear button (appears when text is present).
    Number Validation: Special handling for numeric values.
    Form Integration: Fully compatible with form libraries like React Hook Form (demo included in Storybook).
    Input states: password, number, textFilled state with active controls

  ![input_image](https://github.com/ivan10gudko/test_task/raw/main/screenshots/input1.png)
  ![input_image](https://github.com/ivan10gudko/test_task/raw/main/screenshots/input2.png)
    
## 2.Toast Notifications (<Toast />)
A feedback system for displaying temporary messages appearing in the bottom-right corner.
Key Features:
   Auto-dismiss: Automatically closes after a set duration (timer clears on unmount).
   Animations: Smooth CSS animations for appearance (Slide-in) and disappearance (Slide-out).
   Variants: 4 message types with corresponding colors and icons: success, error, warning, info.
   Stackable: Designed to render in a fixed container (Portal-like behavior).

Notification variants: success, error, warning, info

![input_image](https://github.com/ivan10gudko/test_task/raw/main/screenshots/toast.png)

## 3. Sidebar Menu (<SidebarMenu />)
A navigation drawer sliding from the side, supporting nested submenus.
Key Features:
   Recursive Rendering: Supports infinite nesting depth (recursive structure).
   Transitions: Smooth slide animation (transform/translate).
   Backdrop: Semi-transparent background; clicking it closes the menu.
   UX Enhancements: Locks page scroll (body scroll lock) when the menu is open.
   Sidebar menu appearanceNested submenus support (accordion style)
![input_image](https://github.com/ivan10gudko/test_task/raw/main/screenshots/sidebar1.png)
![input_image](https://github.com/ivan10gudko/test_task/raw/main/screenshots/sidebar2.png)

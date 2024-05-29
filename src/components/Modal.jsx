import classes from "./Modal.module.css";

function Modal({ children }) {
  return (
    <>
      <div className={classes.backdrop} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

// Xx: per PostsList.jsx, props is to tell where the components go, as we are wrapping components with
// Xx: in this case, since we only need props.children, using destructuring to only get children and calling only children
// Xx: as opposed to other pros where we choose the name and pass it, children is a reserved prop name referring to the content passed between the opening and closing of the component
// Xx: open is another reserved prop, well to open the element; the value is usually ={true}, but if you want to set as that, you can also just add it as open./

export default Modal;
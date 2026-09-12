/*  Drag-and-Drop List
    This JavaScript file allows the user
    to rearrange list items by dragging them.  */
// Get the list container from HTML
const dragList = document.getElementById("dragList");
// Get all draggable list items
const listItems = document.querySelectorAll(".list-item");
// Get the status message
const statusMessage = document.getElementById("statusMessage");
// Store the item currently being dragged
let draggedItem = null;
/*  Add drag events to every list item  */
listItems.forEach(function (item) {
    /*  dragstart runs when the user
        starts dragging an item.    */
    item.addEventListener("dragstart", function () {
        // Store the current item
        draggedItem = item;
        // Add a class to show that it is being dragged
        item.classList.add("dragging");
        // Update status message
        statusMessage.textContent =
            "Move the item to a new position.";
    });
    /*  dragover runs repeatedly while
        the dragged item is over another item.    */
    item.addEventListener("dragover", function (event) {
        /*  Prevent the browser's default behavior.
            This allows the element to become
            a valid drop target.        */
        event.preventDefault();
        // Do not apply the effect to the item being dragged
        if (item === draggedItem) {
            return;
        }
        // Remove previous drag-over effects
        listItems.forEach(function (listItem) {
            listItem.classList.remove("drag-over");
        });
        // Highlight the current drop position
        item.classList.add("drag-over");
    });
    /*  drop runs when the user releases
        the dragged item.    */
    item.addEventListener("drop", function (event) {
        // Prevent the browser's default drop behavior
        event.preventDefault();
        // Ignore if the item is dropped on itself
        if (item === draggedItem) {
            return;
        }
        /*  Find the position of the item
            being dragged.        */
        const draggedIndex =
            Array.from(dragList.children)
                .indexOf(draggedItem);
        /*  Find the position of the item
            where it is being dropped.        */
        const targetIndex =
            Array.from(dragList.children)
                .indexOf(item);
        /*  If the dragged item is above
            the target item, insert it before target.        */
        if (draggedIndex < targetIndex) {
            item.after(draggedItem);
        } else {
            /*  If the dragged item is below
                the target item, insert it before target.            */
            item.before(draggedItem);
        }
        // Update the numbers after rearranging
        updateNumbers();
        // Show success message
        statusMessage.textContent =
            "List order updated successfully.";
        // Remove the highlight
        listItems.forEach(function (listItem) {
            listItem.classList.remove("drag-over");
        });
    });
    /*  dragend runs when the drag operation ends.    */
    item.addEventListener("dragend", function () {
        // Remove dragging style
        item.classList.remove("dragging");
        // Remove all drop highlights
        listItems.forEach(function (listItem) {
            listItem.classList.remove("drag-over");
        });
        // Reset dragged item
        draggedItem = null;
    });
});
/*  Function to update the numbers
    after the list has been rearranged.  */
function updateNumbers() {
    // Get the current list items
    const currentItems =
        dragList.querySelectorAll(".list-item");
    // Loop through all items
    currentItems.forEach(function (item, index) {
        // Find the number element
        const number =
            item.querySelector(".number");
        // Update number
        number.textContent = index + 1;
    });
}
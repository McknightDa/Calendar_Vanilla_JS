const closeDialog = (dialogContainerNode, body) => {
    dialogContainerNode.style.display = 'none';
    body.style.overflowY = 'auto';
};

export const openDialog = () => {
    const body = document.querySelector('body');
    const dialogContainer = document.querySelector('.basic_modal_styles');
    const dialogPaper = document.querySelector('.basic_modal_paper');
    const closeBtn = document.querySelector('#modal_close_btn');

    closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeDialog(dialogContainer, body)
    });
    dialogPaper.addEventListener('click', e => e.stopPropagation());
    dialogContainer.addEventListener('click', () => closeDialog(dialogContainer, body));
    dialogContainer.style.display='flex';
    body.style.overflowY = 'hidden';
};
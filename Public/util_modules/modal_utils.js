const closeDialog = (dialogContainerNode, body) => {
    dialogContainerNode.style.display = 'none';
    body.style.overflowY = 'auto';
    document.querySelector('.basic_modal_styles').innerHTML = null;
};

/* Will generate the basic mark-up*/
const generateModalMarkup = (dialogContainer) => {
    const paper = document.createElement('div');
    paper.className = 'basic_modal_paper';
    dialogContainer.appendChild(paper);
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.className ='basic_modal_close_btn';
    paper.appendChild(closeBtnContainer);
    const closeBtn = document.createElement('span');
    closeBtn.id='modal_close_btn';
    closeBtn.role ='button';
    closeBtn.ariaLabel = 'close button';
    closeBtn.innerText = 'X';
    closeBtnContainer.appendChild(closeBtn);
    const contentContainer = document.createElement('div');
    contentContainer.className ='basic_modal_content_and_details_container';
    paper.appendChild(contentContainer);
    const modalContent = document.createElement('div');
    modalContent.className = 'basic_modal_content';
    contentContainer.appendChild(modalContent);
    const modalDetails = document.createElement('div');
    modalDetails.className = 'basic_modal_details';
    contentContainer.appendChild(modalDetails)
};

export const openDialog = (contentNode, customPaperContainerStyles = {}, type='basic') => {
    const body = document.querySelector('body');
    const dialogContainer = document.querySelector('.basic_modal_styles');
    switch(type){
        case "basic":
            generateModalMarkup(dialogContainer);
            break;
        default:
            generateModalMarkup(dialogContainer);
            break;
    }
    const dialogPaper = document.querySelector('.basic_modal_paper');
    const closeBtn = document.querySelector('#modal_close_btn');
    const content = document.querySelector('.basic_modal_content');

    const paperOverwriteKeys = Object.keys(customPaperContainerStyles);
    paperOverwriteKeys.forEach(styleKey => {
        dialogPaper.style[styleKey] = customPaperContainerStyles[styleKey];
    });
    closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeDialog(dialogContainer, body)
    });
    dialogPaper.addEventListener('click', e => e.stopPropagation());
    dialogContainer.addEventListener('click', () => closeDialog(dialogContainer, body));
    dialogContainer.style.display='flex';
    body.style.overflowY = 'hidden';
    content.appendChild(contentNode);
};
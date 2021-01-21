export const  downloadFile = (data,name)=> {
    const file = new Blob([data], {type: 'text/csv'});
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = fileURL;
    a.setAttribute("download", name);
    a.click();
}
export const hii = 1;
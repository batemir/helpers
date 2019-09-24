import React from 'react';

export default Component => {
    const WithApiUploadComponent = class extends React.Component {
        onFileReaderLoad = (file, reader) => {
            const dataFile = this.getDataFromFile(file);
            const { result } = reader;

            return this.getImageFromFile({
                ...dataFile,
                url: result
            });
        };

        getImageFromFile = dataImage =>
            new Promise((resolve, reject) => {
                const image = new Image();

                image.onload = () => resolve(image);
                image.onerror = reject; // TODO: Добавить обработчик
                image.src = dataImage.url;
            }).then(image => ({
                ...dataImage,
                width: image.width,
                height: image.height
            }));

        getFileBase64 = file => {
            const promiseFile = new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => resolve(reader);
                reader.onerror = reject; // TODO: Добавить обработчик
                reader.readAsDataURL(file);
            }).then(reader => this.onFileReaderLoad(file, reader));

            return promiseFile;
        };

        getDataFromFile = file => ({
            name: file.name,
            size: file.size,
            type: file.type
        });

        getFormDataObject = param => {
            const formData = new FormData();

            Object.keys(param).forEach(key => formData.append(key, param[key]));

            return formData;
        };

        render() {
            return (
                <Component
                    getFileBase64={this.getFileBase64}
                    getFormDataObject={this.getFormDataObject}
                    {...this.props}
                />
            );
        }
    };

    return WithApiUploadComponent;
};

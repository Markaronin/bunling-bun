
type ImageName = 'testImg';

export class ImageHandler {
    private static imageToUrlMap: Record<ImageName, string> = {
        testImg: "images/testImg.jpg"
    };
    private static blankImage = document.createElement('img');

    public readonly images = Object.fromEntries(
        Object.keys(ImageHandler.imageToUrlMap).map((key) => [key, ImageHandler.blankImage]),
    ) as Record<ImageName, HTMLImageElement>;

    public async load(): Promise<void> {
        await Promise.all(
            Object.keys(this.images).map(
                (img: string) =>
                    new Promise<HTMLImageElement>((resolve, reject) => {
                        const imgElement = document.createElement('img');
                        imgElement.onload = () => {
                            this.images[img as ImageName] = imgElement;
                            resolve(imgElement);
                        };
                        const failed = (ev: any) => {
                            console.error(ev)
                            reject(`Failed to load image ${img}`);
                        };
                        imgElement.onerror = failed;
                        imgElement.onabort = failed;
                        imgElement.src = ImageHandler.imageToUrlMap[img as ImageName];
                    }),
            ),
        );
    }
}
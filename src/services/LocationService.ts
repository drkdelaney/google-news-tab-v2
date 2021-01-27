export async function getLatLong(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve([position.coords.latitude, position.coords.longitude]);
            }, reject);
        } else {
            reject(new Error('Location blocked'));
        }
    });
}

export function getIconInfo(url: string): string[] | undefined {
    const urlRegex = /(day|night)\/(\w{3,})(,?(\d{2,3})?)/gm;
    const location = document.createElement('a');
    location.href = url;
    const result = urlRegex.exec(location.pathname);
    if (result) {
        const [, dayNight, imageKey, , precipitation] = result;
        return [imageKey, dayNight, precipitation];
    }
}

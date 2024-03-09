import fs from 'fs'
import util from 'util'

const unlinkAsync = util.promisify(fs.unlink);

const removeFile = async (path: string): Promise<boolean> => {
    try {
        await unlinkAsync(path);
        return true;
    } catch (error) {
        return false;
    }
}




export default removeFile
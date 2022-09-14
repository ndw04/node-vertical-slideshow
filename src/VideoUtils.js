const { spawn } = require('child_process');

class VideoUtils {
    static spawnFFMPEG({ fps, outputFile }) {
        return spawn('ffmpeg', [
            '-f', 'image2pipe',
            '-r', fps.toString(),
            '-i', '-', // signaling input piping
            outputFile.toString()
        ], { stdio: 'pipe' });
    }
}

module.exports = VideoUtils;

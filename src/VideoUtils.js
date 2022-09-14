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

    static streamFrame({ stream, frameBuffer }) {
        stream.write(frameBuffer);
        
    }

    static streamEnd({ stream }) {
        stream.end();
    }
}

module.exports = VideoUtils;

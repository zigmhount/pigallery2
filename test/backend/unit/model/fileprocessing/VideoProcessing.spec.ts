import {expect} from 'chai';
import {VideoProcessing} from '../../../../../src/backend/model/fileprocessing/VideoProcessing';
import {Config} from '../../../../../src/common/config/private/Config';
import {ProjectPath} from '../../../../../src/backend/ProjectPath';
import * as path from 'path';


describe('VideoProcessing', () => {

  // tslint:disable:no-unused-expression
  it('should generate converted file path', async () => {

    ProjectPath.ImageFolder = path.join(__dirname, './../../../assets');
    const videoPath = path.join(ProjectPath.ImageFolder, 'video.mp4');
    expect(await VideoProcessing
      .isValidConvertedPath(VideoProcessing.generateConvertedFilePath(videoPath)))
      .to.be.true;

    expect(await VideoProcessing
      .isValidConvertedPath(VideoProcessing.generateConvertedFilePath(videoPath + 'noPath')))
      .to.be.false;

    {
      const convertedPath = VideoProcessing.generateConvertedFilePath(videoPath);
      Config.Server.Media.Video.transcoding.bitRate = 10;
      expect(await VideoProcessing.isValidConvertedPath(convertedPath)).to.be.false;
    }
    {
      const convertedPath = VideoProcessing.generateConvertedFilePath(videoPath);
      Config.Server.Media.Video.transcoding.codec = 'codec_text' as any;
      expect(await VideoProcessing.isValidConvertedPath(convertedPath)).to.be.false;
    }
    {
      const convertedPath = VideoProcessing.generateConvertedFilePath(videoPath);
      Config.Server.Media.Video.transcoding.format = 'format_test' as any;
      expect(await VideoProcessing.isValidConvertedPath(convertedPath)).to.be.false;
    }
    {
      const convertedPath = VideoProcessing.generateConvertedFilePath(videoPath);
      Config.Server.Media.Video.transcoding.resolution = 1 as any;
      expect(await VideoProcessing.isValidConvertedPath(convertedPath)).to.be.false;
    }
  });

});

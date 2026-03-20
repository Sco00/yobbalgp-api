import { cloudinary } from '../../infrastructure/config/cloudinary.js'

export class CloudinaryService {

  static async uploadPdf(buffer: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          type:          'upload',
          access_mode:   'public',
          folder:        'yobbalgp/invoices',
          public_id:     filename,
          format:        'pdf',
          sign_url: true,
        },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve(result.secure_url)
        }
      )
      stream.end(buffer)
    })
  }
}

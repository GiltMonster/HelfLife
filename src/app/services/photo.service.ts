import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from "@capacitor/preferences";
import { UserPhoto } from "../interfaces/userPhoto";
import { Platform } from "@ionic/angular";
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;

  constructor(
    platform: Platform
  ) {
    this.platform = platform;
    console.log(this.platform.platforms());

  }

  public async addToGallery() {
    // Tirar uma foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // dados baseados em arquivos; fornece melhor desempenho
      source: CameraSource.Camera, // tira automaticamente uma nova foto com a câmera
      quality: 100 // qualidade máxima (0 a 100)
    });

    // Salvar a foto e adicioná-la à coleção de fotos
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    console.log(JSON.stringify(this.photos));

    // Salvar as fotos no armazenamento de preferências
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  public async loadSaved() {
    // Recuperar dados do array de fotos em cache
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // Forma mais fácil de detectar quando está executando na web:
    // "quando a plataforma NÃO é híbrida, faça isso"
    if (!this.platform.is('hybrid')) {

      // Exibir a foto lendo-a no formato base64
      for (let photo of this.photos) {
        // Ler os dados de cada foto salva do sistema de arquivos
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });

        // Plataforma web apenas: Carregar a foto como dados base64
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  private async savePicture(cameraPhoto: Photo) {
    // Converter foto para o formato base64, necessário pela API do sistema de arquivos para salvar
    const base64Data = await this.readBase64(cameraPhoto);

    // Escrever o arquivo no diretório de dados
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Exibir a nova imagem reescrevendo o caminho 'file://' para HTTP
      // Detalhes: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: fileName,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      };
    } else {
      // Usar webPath para exibir a nova imagem em vez de base64, já que está
      // carregada na memória
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  private async readBase64(photo: Photo) {
    // "híbrido" detectará Cordova ou Capacitor
    if (this.platform.is('hybrid')) {
      // ler o arquivo no formato base64
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    } else {
      // Buscar a foto, ler como um blob, e depois converter para o formato base64
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }

  }

  private convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  public async deletePicture(photo: UserPhoto, position: number) {
    // Remover esta foto do array de referência de fotos
    this.photos.splice(position, 1);

    // Atualizar o cache do array de fotos sobrescrevendo o array existente
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // Excluir o arquivo de foto do sistema de arquivos
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }
}

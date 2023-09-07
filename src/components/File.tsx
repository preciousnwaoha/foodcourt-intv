import React, { useContext,} from 'react'
import { formatDate, getContentTypeHeader, getFileType, getFileTypeColor } from '../lib/utils'
import { FileType } from '../config/types'
import {RiDownloadCloudFill, RiHeartFill, RiHeartLine, RiPrinterFill} from 'react-icons/ri'
import { AppContext } from '../context/app-context'
import {BiSolidFileImage} from 'react-icons/bi'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'


interface propTypes  {
  file: FileType,
  onSelect: (file: FileType) => void,
  onDeSelect: () => void,
  
}
const File = ({file, onSelect, onDeSelect, }: propTypes) => {
  const appCtx = useContext(AppContext)

  const  {favorites, addToFavorites, removeFromFavorites} = appCtx

  const handleClicked = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      // console.log('double click');
      if (isImage) {

      onSelect(file)
      } else {
        handleDownloadDoc()
      }
    }
  }

  const handleAddFavorite = (id: string) => {
    addToFavorites(id)
  }

  const handleRemoveFavorite = (id: string) => {
    removeFromFavorites(id)
  }

  
  
  const fileType = getFileType(file.src)


  const imageExtensionsPattern = /(jpg|jpeg|png|gif|bmp|svg)$/i;

  // const documentExtensionsPattern = /(docx?|xlsx?|pptx?|pdf|txt|csv|rtf|odt|ods|odp|epub|md|html?|xml|json|log|yaml|yml|tsv|ini|config|cfg|rtfd|pages|key|numbers|pages-tef|numbers-tef|gdoc|gsheet|gslides|gform|gdraw|docm|dotx?|dotm|potx?|ppam|ppsx?|sldx?|xps|vsdx?|vssx?|vstx?|xlsm|xlsb|xltx?|xltm|pptm|potm|ppsm|sldm|thmx|mpp|mpt|msg|oft|one|onepkg|pub|py|rb|ts|json5?|js|jsx|ts|tsx|yaml|yml|xml|sql|java|c|cpp|h|hpp|cs|vb|php?|pl|swift|go|d|rs|fs|fsx|nim|kt|kts|v|sc|lua|sh|bash|zsh|fish|bat|ps1|psm1|dll|lib|so|a|out|class|jar|zip|tar|gz|7z|rar|cab|deb|rpm|msi|pkg|dmg|img|iso|vhd|xva|ova|pem|cer|crt|key|p7b|p7r|pfx|p12|asc|dat|db|sqlite|sqlitedb|mdb|accdb|dbf|dbx|dbf|dbf|db|pct|vsd|vsdx|mdf|ndf|bak|ldf|resx|rc|def|clp|vbp|frm|dsw|dsp|dsw|dsp|proj|sln|suo|user|vbproj|vcproj|vcxproj|sln|suo|user|sln|suo|user|pdb|ilk|pch|sbr|obj|appx|appxbundle|appxupload|manifest|cer|json|nupkg|nuspec|code-workspace|patch|csv|tsv|log|md|markdown|markdown|mdown|mkdn|mkd|text|rst|org|adoc|asciidoc|scm|ss|ss|sis|sisx|jar|jad|cab|wp|wsp|wgt|air|apk|ipa|xap|xar|deb|tar\.gz|dmg|pkg|rpm|app|exe|dll|com|bat|sh|bash|zsh|fish|cmd|vbs|ps1|ps1xml|ps2|ps2xml|psc1|psc2|reg|scf|scr|vb|vbe|js|jse|wsf|wsh|ws|html|htm|mht|mhtml|xhtml|shtml|xht|xhtm|xml|dtd|xsl|xsd|rng|cgm|wml|wmls|wbmp|avi|flv|mkv|mov|mp4|mpeg|mpg|ogv|webm|wmv|3gp|asf|asx|flv|m4v|mkv|mov|mp4|mpeg|mpg|ogv|webm|wmv|3gp|3g2|m3u8|pls|m3u|m4a|aac|flac|mp3|oga|opus|wav|midi|mid|xmf|rtttl|rtx|ota|imy|ogg|spx|zip|rar|7z|tar|gz|bz2|iso|bin|cue|dmg|img|nrg|qcow|vdi|vmdk|ova|ovf|tar|gzip|bz2|xz|lzh|ace|uue|bz2|zip|gzip|rar|tar|gz|7z|ace|bz2|cab|iso|lzh|rar|tar|zip)$/i


  const isImage = imageExtensionsPattern.test(fileType!) 

  const color = 'text-' + getFileTypeColor(fileType!) + '-300'
  
  const isFavorite = favorites.includes(file.id)

  const contentType = getContentTypeHeader(fileType!)

  const handleDownloadDoc = () => {
    fetch('https://cors-anywhere.herokuapp.com/' + file.src, {
    method: 'GET',
    headers: {
      'Content-Type': contentType!,
    },
  })
  .then((response) => response.blob())
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${file.src}`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode!.removeChild(link);
  });
  }

  const handlePrintDoc = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault();
      window.open(file.src, "PRINT", "height=400,width=600");
  }


  const fadeColor = 'bg-' + color + '-100'
  

  return (
    <div className='p-4 shadow rounded-md cursor-pointer' onClick={handleClicked}>
      <div className='w-full h-44 rounded overflow-hidden mb-4 relative bg-[#F2F5F7]'>
      {fileType ? 
            <>
              {isImage
              ? <img src={file.src} alt={file.name} className='w-full h-full object-fill' />
            : <div className='text-red-300 text-6xl w-full h-full flex items-center justify-center'><BsFillFileEarmarkPdfFill  /></div>}
            </> :
          
            <img src={"help.jpg"} alt={file.name} className='w-full h-full' />
            
          }
        
        {isFavorite ? 
        <div 
        className='rounded-full flex text-center items-center justify-center 
        bg-[#00000047] backdrop-blur-xs  w-9 h-9 absolute top-2 right-2 
        hover:text-white text-yellow-300 text-xl'
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          handleRemoveFavorite(file.id)
        }}
        >
          <RiHeartFill className='' />
        </div>
        : <div 
        className='rounded-full flex text-center items-center justify-center 
        bg-[#00000047] backdrop-blur-xs  w-9 h-9 absolute top-2 right-2 
        hover:text-yellow-300 text-white text-xl'
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          handleAddFavorite(file.id)
        }}
        >
          <RiHeartLine className='' />
        </div>}

        {!isImage && <div className='flex bottom-2 left-2 absolute'>
          <div 
          className='border rounded-full w-8 h-8 flex items-center 
          text-center justify-center text-md text-[#6E7377] mr-2' 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            handleDownloadDoc()
          }}
          >
            <RiDownloadCloudFill />
          </div>
          <div 
          className='border rounded-full w-8 h-8 flex items-center 
          text-center justify-center text-md text-[#6E7377]' 
          onClick={handlePrintDoc}>
            <RiPrinterFill />
          </div>
        </div>}

      </div>
      <div className='flex items-center'>

        <div className={`rounded-full h-9 w-9 ${fadeColor} mr-4 
        relative overflow-hidden ${color} flex items-center justify-center text-xl`}>
          {isImage ? 
          <BiSolidFileImage /> 
        : <BsFillFileEarmarkPdfFill />}
        </div>

        <div>
          <h6 className='text-sm font-medium text-[#2E3031] mb-0.5'>{file.name}</h6>
          <p className='text-xs text-[#6F7376]'>{formatDate(file.created_at)}</p>
        </div>
      </div>
    </div>
  )
}

export default File
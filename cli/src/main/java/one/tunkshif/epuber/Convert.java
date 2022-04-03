package one.tunkshif.epuber;

import org.apache.log4j.Logger;

import java.io.File;

public class Convert extends Thread
{
    Logger logger=Logger.getLogger(Convert.class);
    private String pdfPath;
    private String epubPath;

    public Convert(String pdfPath,String epubPath)
    {
        this.pdfPath=pdfPath;
        this.epubPath=epubPath;
    }

    @Override
    public void run()
    {
        File file=new File(pdfPath);
        logger.info(file.getName()+" starts conversion");
        Epuber.convert(pdfPath,epubPath);
        logger.info(file.getName()+" has finished conversion !");
    }
}

package one.tunkshif.epuber;

import com.beust.jcommander.JCommander;
import com.beust.jcommander.ParameterException;

import java.io.File;

import org.apache.log4j.Logger;


public class Main {
    Logger logger = Logger.getLogger(Main.class);
    final MainCLIParameters mainArgs = new MainCLIParameters();

    public static void main(String[] args) {
        Main demo = new Main();
        demo.handleInputArgs(args);
        demo.run();
    }

    void handleInputArgs(String[] args) {
        JCommander jCommander = new JCommander(mainArgs);
        jCommander.setProgramName("EPUBer");

        try {
            jCommander.parse(args);
        } catch (ParameterException exception) {
            logger.error(exception.getMessage());
            showUsage(jCommander);
        }

        if (mainArgs.isHelp()) {
            showUsage(jCommander);
        }
    }

    void showUsage(JCommander jCommander) {
        jCommander.usage();
        System.exit(0);
    }

    void run() {
        logger.info("Processing PDF to EPUB ...");

        Object[] profiles = mainArgs.getProfileFiles().toArray();
        for (Object tmpProfile : profiles) {
            String profile = (String) tmpProfile;
            File file = new File(profile);
            if (mainArgs.getOutputDir() != null) {
                new Convert(profile, mainArgs.getOutputDir() + "\\" + file.getName().replaceAll("\\.pdf$", ".epub")).start();
            } else {
                new Convert(profile, file.getAbsolutePath().replaceAll("\\.pdf$", ".epub")).start();
            }
        }
    }
}
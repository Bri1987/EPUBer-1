package one.tunkshif.epuber;

import com.beust.jcommander.IParameterValidator;
import com.beust.jcommander.ParameterException;

import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FilesParameterValidator implements IParameterValidator {
    @Override
    public void validate(String name, String value) throws ParameterException {
        String[] profiles = value.split(" ");
        for (String profile : profiles) {
            Path pathToConfig = Paths.get(profile);

            if (!exists(pathToConfig)) {
                String message = String.format("[%s] does not exist: ", value);
                throw new ParameterException(message);
            }
            if (!value.endsWith(".pdf")) {
                String message = String.format("[%s] is not a pdf file", value);
                throw new ParameterException(message);
            }
        }
    }

    private boolean exists(Path path) {
        return (Files.exists(path, LinkOption.NOFOLLOW_LINKS));
    }

}

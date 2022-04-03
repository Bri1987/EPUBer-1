package one.tunkshif.epuber;

import com.beust.jcommander.Parameter;
import com.beust.jcommander.Parameters;

import java.util.ArrayList;
import java.util.List;

@Parameters(separators = "=") //space works too
public class MainCLIParameters
{
    @Parameter(names = {"-h", "--help"}, help = true,
            description = "Displays help information")
    private boolean help;

    @Parameter(
               variableArity = true,
               required = true,
               validateWith = FilesParameterValidator.class,
               description = "path(s) to file(s) which you want to convert")
    private List<String> profileFiles = new ArrayList<>();

    @Parameter(names = {"--output"},
            validateWith = DirectoryParameterValidator.class,
            description = "path to directory which will save your file after converting")
    private String outputDir;

    public String getOutputDir() {
        return outputDir;
    }

    public List<String> getProfileFiles() {
        return profileFiles;
    }

    public boolean isHelp()
    {
        return help;
    }
}

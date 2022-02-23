import java.util.Properties;
import java.io.InputStream;

// Needs the bouncycastle JAR installed on the atom as a custom library.
// URL: https://www.bouncycastle.org/latest_releases.html
// Note: the page above is not managed by or officially endorsed by Boomi.
import org.bouncycastle.jcajce.provider.digest.Keccak;
import java.nio.charset.StandardCharsets
import org.apache.commons.codec.binary.Hex

for( int i = 0; i < dataContext.getDataCount(); i++ ) {
    InputStream is = dataContext.getStream(i);
    Properties props = dataContext.getProperties(i);
    
    // Retrieve the value of the current DDP_data_to_hash 
    originalString = props.getProperty("document.dynamic.userdefined.DDP_data_to_hash");
    
    // Hashes the originalString with Keccak-256, and hex encodes the result
    Keccak.Digest256 digest256 = new Keccak.Digest256();
    byte[] hashbytes = digest256.digest(originalString.getBytes(StandardCharsets.UTF_8));
    String keccakHex = Hex.encodeHexString(hashbytes);
    
    // Set the Keccak hashed and hex encoded string into the new DDP_hashed_data
    props.setProperty("document.dynamic.userdefined.DDP_hashed_data", keccakHex);

    dataContext.storeStream(is, props);
}

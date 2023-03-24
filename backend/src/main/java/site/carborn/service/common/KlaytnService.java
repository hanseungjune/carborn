package site.carborn.service.common;

import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.util.common.HTTPUtils;
import site.carborn.util.network.Header;
import site.carborn.util.network.Post;
import site.carborn.util.network.RequestBody;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

@Service
public class KlaytnService {
    @Value("${klaytn.accessKeyId}")
    public String accessKey;

    @Value("${klaytn.secretAccessKey}")
    public String secretAccessKey;

    @Value("${klaytn.authorization}")
    public String authorization;

    @Value("${klaytn.chainId}")
    public String chainId;

    public Map<String, Object> getCarHash() {
        try {
            JSONObject geoData = requestNewAccount();
            if (geoData == null) {
                throw new NullPointerException();
            }
            Map<String, Object> map = new HashMap<>();
            map.put("address", geoData.get("address"));

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        throw new NullPointerException();
    }

    public JSONObject requestNewAccount() throws IOException {
        String url = String.format("https://wallet-api.klaytnapi.com/v2/account");

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Content-Type", HTTPUtils.CONTENT_TYPE_JSON);
        header.append("Authorization", authorization);
        header.append("x-chain-id", chainId);

        RequestBody requestBody = new RequestBody();

        Post post = new Post(url, header, requestBody);

        int responseCode = post.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException();
        }

        String content = post.post();
        return new JSONObject(content);
    }
    @Transactional
    public Map<String, Object> getUri(Object object) {
        try {
            JSONObject geoData = requestMetaData(object);
            if (geoData == null) {
                throw new NullPointerException();
            }
            Map<String, Object> map = new HashMap<>();
            map.put("uri", geoData.get("uri"));

            return map;
        } catch (IOException e) {
            System.out.println(e);
        }

        throw new NullPointerException();
    }
    public JSONObject requestMetaData(Object object) throws IOException {
        String url = String.format("https://metadata-api.klaytnapi.com/v1/metadata");

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Content-Type", HTTPUtils.CONTENT_TYPE_JSON);
        header.append("Authorization", authorization);
        header.append("x-chain-id", chainId);

        JSONObject requestBody = new JSONObject();
        JSONObject metadata = new JSONObject(object);
        requestBody.put("metadata", metadata);

        Post post = new Post(url, header, requestBody);

        int responseCode = post.getHttpResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException();
        }

        String content = post.httpPost();
        return new JSONObject(content);
    }

    public void requestContract(String metaDataUri, String carHash, String alias) throws IOException {
        String url = String.format("https://kip37-api.klaytnapi.com/v2/contract");

        Header header = new Header();
        header.append("User-Agent", HTTPUtils.USER_AGENT);
        header.append("Accept-Language", HTTPUtils.ACCEPT_LANGUAGE);
        header.append("Connection", HTTPUtils.CONNECTION);
        header.append("Content-Type", HTTPUtils.CONTENT_TYPE_JSON);
        header.append("Authorization", authorization);
        header.append("x-chain-id", chainId);

        JSONObject requestBody = new JSONObject();
        requestBody.put("alias", alias);
        requestBody.put("uri", metaDataUri);
        requestBody.put("owner", carHash);
        JSONObject options = new JSONObject();
        options.put("enableGlobalFeePayer", true);
        requestBody.put("options", options);

        Post post = new Post(url, header, requestBody);

        int responseCode = post.getHttpResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new NullPointerException();
        }
    }
}

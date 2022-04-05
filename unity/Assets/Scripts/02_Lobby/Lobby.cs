using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
//using System.Windows.Forms;
public class Lobby : MonoBehaviour
{
    public Button settingBtn;
    public Button openSongPageBtn;
    public Button loadSquareSceneBtn;
    public Button characterSetBtn;

    public CharacterSetPage characterSetPage;
    public SongPage songPage;
    public LobbySetting lobbySetting;

    public Character character;
    void Start()
    {
        
        //��ư �̺�Ʈ ���
        settingBtn.onClick.AddListener(delegate { lobbySetting.Open(); });
        loadSquareSceneBtn.onClick.AddListener(LoadSquareScene);
        openSongPageBtn.onClick.AddListener(delegate { songPage.Open(); });
        characterSetBtn.onClick.AddListener(delegate { characterSetPage.Open(); });

        characterSetPage.Close();
        songPage.Close();

        characterSetPage.OnChangeCharacter += ChangeCharacter;

        ChangeCharacter();
    }

    void LoadSquareScene()
    {//����� �ε�

    }
    void ChangeCharacter()
    {
        Debug.Log(UserData.Instance.user.character);
        character.ChangeSprite(UserData.Instance.user.character);
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
